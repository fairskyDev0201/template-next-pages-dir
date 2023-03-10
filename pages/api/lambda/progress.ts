import { AwsRegion, getRenderProgress, RenderProgress } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { config, speculateFunctionName } from "../../../config";

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // TODO: Validate
  const result = await getRenderProgress({
    bucketName: req.query.bucketName as string,
    functionName: speculateFunctionName(),
    region: config.region as AwsRegion,
    renderId: req.query.id as string,
  });

  res.status(200).json(result);
}
