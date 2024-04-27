import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="number" placeholder="휴대폰번호" required errors={[]} />
        <FormInput type="number" placeholder="인증번호" required errors={[]} />
        <FormButton text="인증하기" loading={false} />
      </form>
    </div>
  );
}
