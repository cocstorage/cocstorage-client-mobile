export default function getErrorMessageByCode(code: string): string {
  let errorMessage = '알 수 없는 오류가 발생했어요.';

  switch (code) {
    case 'COC003':
      errorMessage = '이미 가입된 이메일이에요.';
      break;
    case 'COC004':
      errorMessage = '비밀번호는 최소 7자 이상으로 입력해주세요.';
      break;
    case 'COC005':
      errorMessage = '비밀번호에는 최소 1개 이상의 특수문자가 포함되어야 해요.';
      break;
    case 'COC006':
      errorMessage = '이미 삭제되었거나 존재하지 않는 게시글이에요.';
      break;
    case 'COC007':
      errorMessage = '이미 인증된 계정이에요.';
      break;
    case 'COC008':
      errorMessage = '이메일 또는 비밀번호가 올바르지 않아요.';
      break;
    case 'COC009':
      errorMessage = '이메일 인증 후 로그인을 하실 수 있어요.';
      break;
    case 'COC010':
      errorMessage = '관리자에 의해 비활성화된 계정이에요.';
      break;
    case 'COC011':
      errorMessage = '회원 탈퇴 절차를 진행 중인 계정이에요.';
      break;
    case 'COC012':
      errorMessage = '회원가입 또는 로그인을 진행해주세요.';
      break;
    case 'COC014':
      errorMessage = '이미지 파일만 업로드할 수 있어요.';
      break;
    case 'COC016':
      errorMessage = '이미지가 올바르지 않거나 허용되지 않는 이미지 형식이에요.';
      break;
    case 'COC017':
      errorMessage = '인증 기간이 만료되었어요. 관리자에게 문의해주세요.';
      break;
    case 'COC018':
      errorMessage = '입력하신 정보로 가입된 계정이 존재하지 않아요.';
      break;
    case 'COC022':
      errorMessage = '로그인 세션이 만료되었어요. 다시 로그인해주세요.';
      break;
    case 'COC023':
      errorMessage = '로그인 세션이 만료되었어요. 다시 로그인해주세요.';
      break;
    case 'COC024':
      errorMessage = '입력하신 주소와 동일한 주소를 가진 게시판이 존재해요.';
      break;
    case 'COC025':
      errorMessage = '입력하신 게시판명과 동일한 게시판이 존재해요.';
      break;
    case 'COC027':
      errorMessage = '비밀번호가 일치하지 않아요.';
      break;
    case 'COC028':
      errorMessage = '이미 추천을 누르신 적이 있네요!';
      break;
    case 'COC029':
      errorMessage = '이미 비추천을 누르신 적이 있네요!';
      break;
    default:
      break;
  }

  return errorMessage;
}
