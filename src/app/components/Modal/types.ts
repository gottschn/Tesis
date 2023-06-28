interface ModalProps {
    visible: boolean;
    title: string;
    message?: string;
    onClosed?: () => void;
    children: React.ReactNode;
}

interface ConfirmationProps extends ModalProps {
    onClickYes: () => void;
    onClickNo: () => void;
} 


export {
    ConfirmationProps,
    ModalProps
}