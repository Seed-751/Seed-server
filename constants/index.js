const ERROR = {
  server: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요",
  alreadyUser: "이미 동일한 정보의 유저가 있습니다",
  notFoundUser: "등록된 회원이 아닙니다",
  notFoundPassword: "비밀번호가 일치하지 않습니다",
  notFoundToken: "토큰이 존재 하지 않습니다",
  notAuthorizedUser: "인증되지 않은 유저입니다",
  emptyEmail: "이메일을 입력해주세요",
  notValidEmail: "유효하지 않은 이메일 형식입니다",
  emptyPassword: "비밀번호를 입력해주세요",
  notValidPassword: "유효하지 않은 비밀번호 형식입니다",
  emptyTitle: "title을 입력해주세요",
  emptyGenre: "genre를 선택해주세요",
  emptyDescription: "description을 입력해주세요",
  emptyImage: "image file을 넣어주세요",
  emptyAudioFiles: "audio file을 넣어주세요",
  notValidImage: "image file이 아닙니다",
  notValidAudio: "audio file이 아닙니다",
  alreadyTitle: "이미 존재하는 title 입니다",
  failPayment: "결제에 실패하였습니다 다시 시도해주세요",
};

const EXPIRES_IN = "1h";

const MAX_AGE = 1000* 60 * 60;

module.exports = {
  ERROR,
  EXPIRES_IN,
  MAX_AGE,
};
