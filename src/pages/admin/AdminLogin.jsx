import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { adminLogin } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

function AdminLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!id.trim()) {
      setError('아이디를 확인해 주세요.');
      return;
    }
    if (!password.trim()) {
      setError('비밀번호를 확인해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const tokens = await adminLogin({ username: id, password });
      login(tokens);
      navigate(ROUTES.ADMIN_MEMBER);
    } catch (err) {
      console.error('[AdminLogin] 관리자 로그인 실패', err);
      const status = err.response?.status;
      if (status === 404 || status === 401) {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-[380px] px-6">
        <h1 className="mb-12 text-center text-3xl font-bold text-ink">관리자 로그인</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="admin-id" className="mb-2 block text-sm font-medium text-ink">
              아이디
              <span className="ml-0.5 align-top text-xs text-error">*</span>
            </label>
            <input
              id="admin-id"
              type="text"
              value={id}
              onChange={(event) => setId(event.target.value)}
              placeholder="아이디를 입력해 주세요."
              autoComplete="username"
              className="w-full rounded-md border border-solid border-field-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-sub focus:border-ink focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-ink">
              비밀번호
              <span className="ml-0.5 align-top text-xs text-error">*</span>
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요."
              autoComplete="current-password"
              className="w-full rounded-md border border-solid border-field-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-sub focus:border-ink focus:outline-none"
            />
          </div>

          <div className="mb-6 h-5">
            {error && <p className="text-sm text-error">{error}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[215px] rounded-md bg-ink py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
