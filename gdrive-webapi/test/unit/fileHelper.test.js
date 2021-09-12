import { describe, test, jest, expect } from "@jest/globals";
import Routes from "./../../src/routes.js";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 64769,
        mode: 33188,
        nlink: 1,
        uid: 224414506,
        gid: 224395777,
        rdev: 0,
        blksize: 4096,
        ino: 6577376,
        size: 214911,
        blocks: 424,
        atimeMs: 1631422104388.344,
        mtimeMs: 1631422104240.3457,
        ctimeMs: 1631422104240.3457,
        birthtimeMs: 1631422104240.3457,
        atime: "2021-09-12T04:48:24.388Z",
        mtime: "2021-09-12T04:48:24.240Z",
        ctime: "2021-09-12T04:48:24.240Z",
        birthtime: "2021-09-12T04:48:24.240Z",
      };

      const mockUser = "kevinuehara";
      process.env.USER = mockUser;
      const filename = "file.png";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "215 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];


      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)

    });
  });
});
