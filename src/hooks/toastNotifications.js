import { toast } from 'react-toastify';

export const successToast = msg => {
	toast.success(msg, {
		position: 'top-right',
		autoClose: 4000,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		progress: undefined,
	});
};

export const errorToast = msg => {
	toast.error(msg, {
		position: 'top-right',
		autoClose: 4000,
		closeOnClick: true,
		pauseOnFocusLoss: true,
		progress: undefined,
	});
};
