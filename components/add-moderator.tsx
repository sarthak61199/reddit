"use client";

import { addModerator } from "@/actions/subreddit";
import { AddModeratorInput, addModeratorSchema } from "@/schema/subreddit";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

function AddModerator() {
  const [isAddModeratorOpen, setIsAddModeratorOpen] = useState(false);
  const { subreddit } = useParams<{ subreddit: string }>();
  const { refresh } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(addModeratorSchema),
  });

  const onClose = () => {
    setIsAddModeratorOpen(false);
    reset();
  };

  const onSubmit = async (data: AddModeratorInput) => {
    try {
      const result = await addModerator(subreddit, data.username);
      toast.success(result.message);
      setIsAddModeratorOpen(false);
      refresh();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Button isIconOnly size="sm" onPress={() => setIsAddModeratorOpen(true)}>
        <GoPlus size={16} />
      </Button>
      <Modal isOpen={isAddModeratorOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add Moderator</ModalHeader>
            <ModalBody>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    placeholder="Username"
                    isRequired
                    isInvalid={!!errors.username?.message}
                    errorMessage={errors.username?.message}
                    disabled={isSubmitting}
                    {...field}
                  />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Add Moderator
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModerator;
