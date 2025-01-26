"use client";

import { createPost } from "@/actions/post";
import { CreatePostInput } from "@/schema/post";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { BiImage, BiX } from "react-icons/bi";
import { toast } from "sonner";

function CreatePostDialog({
  subreddits,
}: {
  subreddits: { name: string; id: string; image: string | null }[];
}) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { subreddit } = useParams<{ subreddit: string }>();

  const { push } = useRouter();

  const { control, handleSubmit, reset, setValue } = useForm<CreatePostInput>({
    defaultValues: {
      title: "",
      content: "",
      subredditId: new Set([]),
      image: undefined,
    },
  });

  useEffect(() => {
    if (subreddit) {
      setValue("subredditId", new Set([subreddit]));
    }
  }, [subreddit]);

  const onClose = () => {
    setIsCreatePostOpen(false);
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

  const onSubmit = async (data: CreatePostInput) => {
    try {
      const { postId, subredditName } = await createPost(data);
      toast.success("Post created successfully");
      push(`r/${subredditName}/post/${postId}`);
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
  };

  return (
    <>
      <Button
        onPress={() => setIsCreatePostOpen(true)}
        color="primary"
        radius="full"
        className="hidden sm:flex"
      >
        Create Post
      </Button>
      <Modal isOpen={isCreatePostOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create a Post</ModalHeader>
            <ModalBody className="space-y-4">
              <Controller
                control={control}
                name="subredditId"
                render={({ field }) => (
                  <Select
                    label="Choose a community"
                    selectedKeys={field.value}
                    onSelectionChange={field.onChange}
                    className="w-full"
                    isRequired
                  >
                    {subreddits.map((subreddit) => (
                      <SelectItem
                        key={subreddit.name}
                        textValue={subreddit.name}
                      >
                        r/{subreddit.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    label="Title"
                    placeholder="Give your post a title"
                    value={field.value}
                    isRequired
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <Textarea
                    label="Content"
                    placeholder="What's on your mind?"
                    value={field.value}
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
                            ? "Drop the image here"
                            : "Drag and drop an image, or click to select"}
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-default-100">
                          {previewUrl && (
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="flat"
                          className="absolute top-2 right-2"
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
                Post
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePostDialog;
