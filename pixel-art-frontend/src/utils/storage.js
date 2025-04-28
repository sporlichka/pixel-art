export const saveNickname = (nickname) => {
    localStorage.setItem('nickname', nickname);
  };
  
  export const getNickname = () => {
    return localStorage.getItem('nickname');
  };