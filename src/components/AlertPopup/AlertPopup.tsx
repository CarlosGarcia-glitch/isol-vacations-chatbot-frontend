import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material"
import Styles from './_AlertPopup.module.scss'
const AlertPopup = ({
   autoClose = true,
   open,
   handleClose,
   message = 'Alert',
   severity = 'success'
}: {
   autoClose: boolean,
   open: boolean,
   handleClose: () => void,
   message: string,
   severity: AlertColor
}) => {
   const alertProps = autoClose ? {} : { onClose: handleClose }
   const snakbarProps = autoClose ? { autoHideDuration: 4000 } : {}

   return (
      <Snackbar
         {...snakbarProps}
         className={Styles.alert_popup}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={open}
         onClose={handleClose}
         key={message}>
         <Alert {...alertProps} severity={severity} className={Styles.alert_popup_content}>
            {message}
         </Alert>
      </Snackbar>
   )
}

export default AlertPopup