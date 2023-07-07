import styles from './ErrorText.module.css';

interface ErrorTextProps {
    children: React.ReactNode;
  }

const ErrorText = ({children}:ErrorTextProps) => {
    return (
        <div className={styles["error-message"]}>
            {children}
        </div>
    );
}

export default ErrorText;