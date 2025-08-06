import ChatbotIcon from '../icons/ChatbotIcon'
import Styles from './_ChatbotThinking.module.scss'

const ChatbotThinking = () => {
   return (
    <div className={`message bot-message`}>
        <ChatbotIcon />
        <div className={Styles.dot_flashing}></div>
      </div>
   )
}

export default ChatbotThinking