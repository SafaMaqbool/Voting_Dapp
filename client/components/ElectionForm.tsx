"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendTransaction } from "thirdweb/react";
import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { contract } from "@/lib/thirdweb";
import { title } from "process";
import { Description } from "@radix-ui/react-dialog";
import { VariableIcon } from "lucide-react";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  electionName: z.string().min(2).max(50),
  electionDescription: z.string().min(2).max(50),
  electionStartDate: z.coerce.date(),
  electionEndDate: z.coerce.date(),
});

const ElectionForm = () => {
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electionName: "",
      electionDescription: "",
      electionStartDate: new Date(),
      electionEndDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const {
      electionName: _name,
      electionDescription: _description,
      electionStartDate: _startTime,
      electionEndDate: _endTime,
    } = values;

    // Contract is expecting an epoch/unix timestamp but we are providing a JS date object 
    // Solution is to convert JS date time to unix timestamp/epoch
    const _startEpoch = BigInt(Math.floor(new Date(_startTime).getTime() / 1000));
    const _endEpoch = BigInt(Math.floor(new Date(_endTime).getTime() / 1000));

    const transaction = prepareContractCall({
      contract,
      method: "createElection",
      params: [_name, _description, _startEpoch, _endEpoch],
    }) as PreparedTransaction;

    try {
      const data = await sendTransaction(transaction);
      toast({
        title: "Election Successfully created",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Election creation failed",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="electionName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Election Name
                <span
                  className={cn("text-red-600 hidden", {
                    "inline-block": fieldState.invalid,
                  })}
                >
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionDescription"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Description
                <span
                  className={cn("text-red-600 hidden", {
                    "inline-block": fieldState.invalid,
                  })}
                >
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionStartDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Start Date
                <span
                  className={cn("text-red-600 hidden", {
                    "inline-block": fieldState.invalid,
                  })}
                >
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="electionEndDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                End Date
                <span
                  className={cn("text-red-600 hidden", {
                    "inline-block": fieldState.invalid,
                  })}
                >
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ElectionForm;
