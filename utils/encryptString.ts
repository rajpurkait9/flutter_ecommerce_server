import bcrypt from "bcrypt";

const EncryptString = async (str: string | undefined) => {
  if (str === undefined)
    return {
      message: "please provide a valid string",
    };
  let concatPassword = concatePassword(str);
  if (concatPassword === undefined) return;
  const saltRound = 10;
  //   genrate salt
  const salt = await bcrypt.genSalt(saltRound);
  //   hashing the password
  const hashPassword = await bcrypt.hash(concatPassword, salt);

  return hashPassword;
};

const concatePassword = (concatStr: string) => {
  const my_code = process.env.MY_DECODE_CODE;
  const concatStrWithMyCode = my_code?.concat(concatStr);
  return concatStrWithMyCode;
};

const decodeConcatPassword = (encodeConcatStr: string) => {
  const my_code = process.env.MY_DECODE_CODE;
  let le = my_code?.length;
  let realPassword = encodeConcatStr?.slice(le, encodeConcatStr.length);
  return realPassword;
};

export { EncryptString, decodeConcatPassword, concatePassword };
