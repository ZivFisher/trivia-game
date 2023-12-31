import { Alert, Button } from '@mui/material';
import axios from 'axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginRegisterForm.scss';

export const RegisterForm: FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const [registerForm, setRegisterForm] = useState<{
        username: string,
        password: string;
    }>({
        username: '',
        password: ''
    });

    const [validatePassword, setValidatePassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeValidatePassword = (content: string) => {
        setValidatePassword(content);
    };

    const passwordValidated = () => validatePassword === registerForm.password;


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault();
        if (registerForm.password === '' || registerForm.username === '' || validatePassword === '') {
            setError('יש למלא את כל השדות')
            return;
        }
        if (!passwordValidated()) {
            setError('הסיסמאות שהזנת אינן זהות');
            return;
        };
        try {
            const { data } = await axios.post("/auth/register", registerForm);
            navigate('/login');

        } catch (error: any) {
            if (error.status === 500) {
                setError('תקלה בשרת, נסה שוב במועד מאוחר יותר');
            }
            else {
                setError('שם המשתמש קיים במערכת');
            }
        }
    }

    return (
        <form className='login-register-form'>
            <label className='label' htmlFor="username">שם משתמש</label>
            <input
                className='input'
                type="text"
                id="username"
                name="username"
                value={registerForm.username}
                onChange={handleChange}
            />

            <label className='label' htmlFor="password">סיסמא</label>
            <input
                className='input'
                type="password"
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleChange}
            />

            <label className='label' htmlFor="validate-password">אימות סיסמא</label>
            <input
                className='input'
                type="password"
                id="validate-password"
                name="validate-password"
                onChange={(e) => handleChangeValidatePassword(e.target.value)}
                value={validatePassword}
            />

            <Button
                className='login-register-button'
                variant="contained"
                type='submit'
                onClick={(e) => handleSubmit(e)}
            >
                הרשמה
            </Button>
            {error &&
                <Alert severity="warning">{error}</Alert>
            }
        </form>
    );
};
