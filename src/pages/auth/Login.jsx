import React, { useMemo, useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import useAuth from '../../hooks/useAuth';
import userService from '../../services/userService';
import './AuthModal.css';

const isValidPhone = (value) => /^\d{10}$/.test(value.trim());

export default function Login() {
  const { login, requestDemoOtp, refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [demoOtpMessage, setDemoOtpMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(searchParams.get('mode') === 'email');

  const backgroundLocation = location.state?.backgroundLocation;
  const closeTarget = useMemo(() => location.state?.from || '/', [location.state]);
  const resolveBackgroundPath = () => {
    if (!backgroundLocation) {
      return closeTarget;
    }

    if (typeof backgroundLocation === 'string') {
      return backgroundLocation;
    }

    return `${backgroundLocation.pathname || ''}${backgroundLocation.search || ''}${backgroundLocation.hash || ''}` || '/';
  };

  const closeModal = () => {
    navigate(resolveBackgroundPath(), { replace: true });
  };

  const continueWithPhone = async () => {
    setPhoneError('');
    setFormMessage('');
    setDemoOtpMessage('');

    if (!isValidPhone(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = phone.trim();
      const response = await userService.checkPhone({ phone: normalizedPhone });
      const exists = response.data?.data?.exists;
      const otpResponse = await requestDemoOtp({ phone: normalizedPhone });
      const otp = otpResponse.data?.data?.otp || '123456';
      setDemoOtpMessage(`Demo OTP: ${otp}`);

      if (exists) {
        await userService.loginWithPhone({ phone: normalizedPhone, demoOtp: otp });
        await refreshProfile();
        navigate(closeTarget, { replace: true });
        return;
      }

      navigate(`/signup?phone=${normalizedPhone}`, {
        replace: true,
        state: {
          backgroundLocation: backgroundLocation || closeTarget,
          demoOtp: otp,
        },
      });
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitEmailLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setFormMessage('');
    setDemoOtpMessage('');

    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      const otpResponse = await requestDemoOtp({ email: email.trim() });
      const otp = otpResponse.data?.data?.otp || '123456';
      setDemoOtpMessage(`Demo OTP: ${otp}`);
      await login({ email: email.trim(), password, demoOtp: otp });
      closeModal();
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={closeModal} className="auth-modal-shell">
      <h1 className="auth-modal-title">Login / Register</h1>
      <p className="auth-modal-subtitle">Please enter your Phone Number</p>

      <div className="auth-modal-stack">
        <div className="auth-input-group">
          <div className="auth-phone-row">
            <div className="auth-country-code">
              <span>+91</span>
              <ChevronDown size={14} />
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className="auth-phone-input"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
            />
          </div>
          {phoneError ? <div className="auth-error"><span className="auth-error-dot">●</span><span>{phoneError}</span></div> : null}
        </div>

        <button type="button" className="auth-primary-btn" onClick={continueWithPhone} disabled={loading}>
          {loading ? 'Please wait...' : 'Continue'}
        </button>

        <div className="auth-divider">Or</div>

        <button type="button" className="auth-secondary-btn" onClick={() => setShowEmailLogin((open) => !open)}>
          <Mail size={18} />
          <span>Continue with Email</span>
        </button>

        {showEmailLogin ? (
          <form className="auth-email-form" onSubmit={submitEmailLogin}>
            <div className="auth-input-group">
              <div className="auth-input-row">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              {emailError ? <div className="auth-error"><span className="auth-error-dot">●</span><span>{emailError}</span></div> : null}
            </div>

            <div className="auth-input-group">
              <div className="auth-input-row">
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {passwordError ? <div className="auth-error"><span className="auth-error-dot">●</span><span>{passwordError}</span></div> : null}
            </div>

            <button type="submit" className="auth-primary-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        ) : null}

        {demoOtpMessage ? <div className="auth-demo-otp"><span>{demoOtpMessage}</span></div> : null}
        {formMessage ? <div className="auth-info"><Phone size={16} /><span>{formMessage}</span></div> : null}
      </div>

      <p className="auth-footer">
        By clicking you agree to <a href="#" className="auth-link">Terms and Conditions</a>
      </p>
      <p className="auth-footer" style={{ marginTop: 10 }}>
        New here? <Link to="/signup" state={{ backgroundLocation: backgroundLocation || closeTarget }} className="auth-link">Create Account</Link>
      </p>
    </Modal>
  );
}
