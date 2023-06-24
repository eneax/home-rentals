"use client";

import * as React from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";

import Modal from "./modal";
import Heading from "@/components/heading";
import Input from "@/components/inputs/input";
import Button from "@/components/button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);

      toast.success("Account created successfully!");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Home Rentals" subtitle="Create an account" />
      <Input
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <React.Fragment>
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="flex items-center justify-center text-center gap-2 mt-4">
        <p className="font-light text-neutral-500">Already have an account?</p>
        <button
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
          className="text-neutral-800 hover:underline cursor-pointer"
        >
          Login
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
