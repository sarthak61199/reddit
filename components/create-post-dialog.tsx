"use client";

import type { Selection } from "@heroui/react";
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
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiImage, BiX } from "react-icons/bi";

// Dummy subreddit data - replace with actual data from your API
const SUBREDDITS = [
  { key: "programming", label: "programming" },
  { key: "MechanicalKeyboards", label: "MechanicalKeyboards" },
  { key: "cats", label: "cats" },
];

function CreatePostDialog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const { subreddit } = useParams<{ subreddit: string }>();

  const [selectedSubreddit, setSelectedSubreddit] = useState<Selection>(
    new Set([])
  );

  useEffect(() => {
    setSelectedSubreddit(new Set(subreddit ? [subreddit] : []));
  }, [subreddit]);

  const onClose = () => {
    setIsCreatePostOpen(false);
    setTitle("");
    setContent("");
    setImage(null);
    setPreviewUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
    setUploadProgress(0);
    setSelectedSubreddit(new Set([]));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const handleSubmit = () => {
    // TODO: Implement post creation
    console.log({
      title,
      content,
      subreddit: selectedSubreddit,
      image,
    });
    onClose();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
    setUploadProgress(0);
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
          <ModalHeader>Create a Post</ModalHeader>
          <ModalBody className="space-y-4">
            <Select
              label="Choose a community"
              selectedKeys={selectedSubreddit}
              onSelectionChange={setSelectedSubreddit}
              className="w-full"
              isRequired
            >
              {SUBREDDITS.map((subreddit) => (
                <SelectItem key={subreddit.key} textValue={subreddit.key}>
                  r/{subreddit.label}
                </SelectItem>
              ))}
            </Select>

            <Input
              label="Title"
              placeholder="Give your post a title"
              value={title}
              isRequired
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              label="Content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minRows={3}
            />

            {!image ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-default-300"
                }`}
              >
                <input {...getInputProps()} />
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
                  onPress={removeImage}
                >
                  <BiX />
                </Button>
                {uploadProgress < 100 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-default-100">
                    <div
                      className="h-full bg-primary transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePostDialog;
