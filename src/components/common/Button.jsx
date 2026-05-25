import styles from './Button.module.css';

/**
 * 공통 버튼 컴포넌트.
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant='primary'] - 버튼 스타일
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {Function} [props.onClick] - 클릭 핸들러
 * @param {React.ReactNode} props.children - 버튼 내용
 */
function Button({ variant = 'primary', disabled = false, onClick, children, ...rest }) {
  const className = `${styles.button} ${styles[variant]}`;

  return (
    <button className={className} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
