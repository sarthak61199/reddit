"use client";

import { createSubreddit } from "@/actions/subreddit";
import {
  CreateSubredditInput,
  createSubredditSchema,
} from "@/schema/subreddit";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { BiImage, BiX } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

function CreateSubredditDialog() {
  const [isCreateSubredditOpen, setIsCreateSubredditOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSubredditInput>({
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
    resolver: zodResolver(createSubredditSchema),
  });

  const onClose = () => {
    setIsCreateSubredditOpen(false);
    setPreviewUrl(null);
    reset();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    }
    return null;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const onSubmit = async (data: CreateSubredditInput) => {
    try {
      const result = await createSubreddit(data);
      toast.success("Subreddit created successfully");
      push(`/r/${result.name}`);
      onClose();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const removeImage = (onChange: (value: null) => void) => {
    onChange(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <Button
        onPress={() => setIsCreateSubredditOpen(true)}
        color="default"
        variant="light"
        radius="full"
        className="hidden sm:flex"
        startContent={<GoPlus size={32} />}
      >
        Create Community
      </Button>
      <Modal isOpen={isCreateSubredditOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create a Community</ModalHeader>
            <ModalBody className="space-y-4">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    label="Name"
                    placeholder="Subreddit Name"
                    value={field.value}
                    isRequired
                    onChange={field.onChange}
                    description="Community names including capitalization cannot be changed"
                    isInvalid={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    label="Description"
                    placeholder="What is your community about?"
                    value={field.value || ""}
                    onChange={field.onChange}
                    minRows={3}
                  />
                )}
              />

              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, value } }) => (
                  <>
                    {!value ? (
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                        ${
                          isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-default-300"
                        }`}
                      >
                        <input
                          {...getInputProps({
                            onChange: (e) => {
                              const files = e.target.files;
                              if (files?.length) {
                                const file = files[0];
                                onChange(file);
                                setPreviewUrl(URL.createObjectURL(file));
                              }
                            },
                          })}
                        />
                        <BiImage className="w-12 h-12 mx-auto mb-4 text-default-400" />
                        <p className="text-default-600">
                          {isDragActive
                            ? "Drop the community icon here"
                            : "Drag and drop a community icon, or click to select"}
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-default-100 mx-auto">
                          {previewUrl && (
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="flat"
                          className="absolute top-0 right-0"
                          onPress={() => removeImage(onChange)}
                        >
                          <BiX />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Community
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateSubredditDialog;
