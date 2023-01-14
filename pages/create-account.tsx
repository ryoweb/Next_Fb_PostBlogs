import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { User } from "../types/user";

const CreateAccount = () => {
  const { isLoading, fbUser } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<User>();

  if (isLoading) {
    return true;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  const submit = (data: User) => {
    const ref = doc(db, `users/${fbUser.uid}`);
    setDoc(ref, data).then(() => {
      alert("ユーザーの作成が完了しました");
      router.push("/");
    });
  };

  return (
    <div className="w-full max-w-md container mt-10">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            ユーザーネーム
          </label>
          <input
            className={classNames(
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
              errors.username ? "border-red-400" : "border"
            )}
            autoComplete="off"
            {...register("username", {
              required: "※必須入力",
              maxLength: {
                value: 50,
                message: "※最大50文字です",
              },
            })}
            id="username"
            name="username"
            type="text"
          />
          {errors.username && (
            <p className="text-red-400 mt-0.5">{errors.username?.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profile"
          >
            プロフィール
          </label>
          <textarea
            className={classNames(
              "h-96 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
              errors.profile ? "border-red-400" : "border"
            )}
            {...register("profile", {
              required: "※必須入力",
              maxLength: {
                value: 300,
                message: "※最大300文字です",
              },
            })}
            id="profile"
            name="profile"
          />
          <p className="flex flex-row-reverse text-sm">
            {watch("profile")?.length}/300
          </p>
          {errors.profile && (
            <p className="text-red-400 mt-0.5">{errors.profile?.message}</p>
          )}
        </div>

        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          作成
        </Button>
      </form>
      <p className="text-center text-gray-500 text-xs">&copy;hoge</p>
    </div>
  );
};

export default CreateAccount;
