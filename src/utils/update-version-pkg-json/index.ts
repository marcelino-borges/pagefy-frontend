import { promises as fsPromises } from "fs";
import { getLatestVersionFromChangelog } from "../../utils/change-log";

const PACKAGE_JSON_PATH = "./package.json";

export const getPackageJson = async () => {
  const str = (await fsPromises.readFile(PACKAGE_JSON_PATH)).toString();
  return JSON.parse(str);
};

const updatePackageJsonVersionFromChangelog = async () => {
  const apiVersion = await getLatestVersionFromChangelog();
  const pkg = await getPackageJson();
  pkg.version = apiVersion;

  await fsPromises.writeFile(PACKAGE_JSON_PATH, JSON.stringify(pkg));
};

updatePackageJsonVersionFromChangelog();
