import { postAnswer } from "@/services/answer";
import type { NextApiRequest, NextApiResponse } from "next";

function genAnswerInfo(reqBody: any) {
  const answerList: any = [];

  Object.keys(reqBody).forEach((key) => {
    if (key === "questionId") return;
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });
  return {
    questionId: reqBody.questionId || "",
    answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(200).json({ errno: -1, msg: "Method 错误" });

    // 获取并格式化表单数据
    const answerInfo = genAnswerInfo(req.body);
    try {
      // 提交到服务端 Mock
      const resData = await postAnswer(answerInfo);
      console.log(resData);
      if (resData.errno === 0) {
        // 提交成功
        res.redirect("/success");
      } else {
        // 提交失败
        res.redirect("/fail");
      }
    } catch (error) {
      res.redirect("/fail");
    }
  }
}
