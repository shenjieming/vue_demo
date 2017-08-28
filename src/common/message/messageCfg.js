import { MessageBox } from 'element-ui';
class messageCFG{
  error=(msgData) =>{
    MessageBox({
      title: '消息',
      type: 'error',
      message: msgData,
      showCancelButton: true,
      showConfirmButton:false,
      // confirmButtonText: '确定',
      cancelButtonText: '确定',
    })
  };
  success=(msgData)=>{
    MessageBox({
      title: '消息',
      type: 'success',
      message: msgData,
      showCancelButton: false,
      showConfirmButton:false,
      cancelButtonText: '确定',
    });
  }
}
export default  messageCFG;

