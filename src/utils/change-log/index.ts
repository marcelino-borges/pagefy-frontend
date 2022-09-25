import { promises as fsPromises } from "fs";

export const getLatestVersionFromChangelog = async (): Promise<any> => {
  const CHANGELOG_PATH = "./changelog.md";

  return await fsPromises
    .readFile(CHANGELOG_PATH, "utf8")
    .then((changelog) => {
      const lastVersionIndex = changelog.indexOf("## Versions");
      return changelog.slice(lastVersionIndex + 20, lastVersionIndex + 25);
    })
    .catch(() => {
      return "0.0.0";
    });
};
