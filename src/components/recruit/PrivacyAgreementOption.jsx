import radioOffIcon from '@/assets/images/radio_n.svg';
import radioOnIcon from '@/assets/images/radio_y.svg';

export function PrivacyAgreementOption({ label, value, checked, onChange }) {
  return (
    <label className="inline-flex min-w-fit items-center gap-[6px] whitespace-nowrap text-[14px] font-normal text-ink">
      <input
        type="radio"
        name="privacyConsent"
        value={value}
        checked={checked}
        autoComplete="off"
        onChange={onChange}
        className="peer sr-only"
      />
      <img
        src={checked ? radioOnIcon : radioOffIcon}
        alt=""
        className="h-4 w-4 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
      />
      {label}
    </label>
  );
}
