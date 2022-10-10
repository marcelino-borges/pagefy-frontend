import { promises as fsPromises } from "fs";

export const getLatestVersionFromChangelog = async (): Promise<any> => {
  const CHANGELOG_PATH = "./changelog.md";

  return await fsPromises
    .readFile(CHANGELOG_PATH, "utf8")
    .then((changelog) => {
      const lastVersionIndex = changelog
        .split("## Versions")[1]
        .split("\r\n")[2]
        .split("[")[1]
        .split("]")[0];
      return lastVersionIndex;
    })
    .catch(() => {
      return "0.0.0";
    });
};
