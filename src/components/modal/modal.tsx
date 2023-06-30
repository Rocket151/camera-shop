import { useEffect } from 'react';

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
}

export default function Modal({
  onClose,
  children,
}: ModalProps): JSX.Element {

  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  });

  return children;
}
