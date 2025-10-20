import { type ChangeEvent, type FC, useState } from 'react';
import { Card }                                from "@/components/card";
import { useAdmin }                            from "@/contexts/admin";


export const LoginPage: FC = () => {
  const [password, setPassword] = useState<string>("");
  const {onSignIn} = useAdmin()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onLogin = () => onSignIn(password)
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card title="Login" width={400}>
        <input name="password" placeholder="Password" onChange={onChange} value={password} type="password" autoComplete="off"/>
        <button className="btn" type="submit" onClick={onLogin}>Login</button>
      </Card>

    </div>
  );
};

