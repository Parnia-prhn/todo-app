import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AuthFormData = {
  email: string;
  password: string;
};

type Mode = "login" | "register";

export default function AuthForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "خطا رخ داد");

      alert(
        mode === "login" ? "با موفقیت وارد شدید" : "ثبت‌نام با موفقیت انجام شد"
      );
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {mode === "login" ? "ورود به حساب" : "ثبت‌نام"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">ایمیل</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            {...register("email", { required: "ایمیل الزامی است" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">رمز عبور</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: { value: 6, message: "حداقل ۶ کاراکتر" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === "login" ? "ورود" : "ثبت‌نام"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-blue-600 hover:underline text-sm"
        >
          {mode === "login"
            ? "حساب کاربری ندارید؟ ثبت‌نام"
            : "حساب دارید؟ ورود"}
        </button>
      </div>
    </div>
  );
}
