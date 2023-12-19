import { DisplayRequestData } from '../models/DisplayRequestData';
import crypto from 'crypto';

describe('DisplayRequestDataモデルのテスト', () => {
    it('should hash the given IP address with correct algorithm', () => {
        const displayRequestData = new DisplayRequestData();
        const ipAddress = '192.168.1.1';

        // crypto モジュールの createHash をモックとして置き換える
        const createHashMock = jest.spyOn(crypto, 'createHash');

        displayRequestData.hashIpAddress(ipAddress);

        expect(createHashMock).toHaveBeenCalledWith('sha256');
    });

    it('should call update with the IP address', () => {
        const displayRequestData = new DisplayRequestData();
        const ipAddress = '192.168.1.1';

        // createHashメソッドを直接モック化
        const createHashMock = jest.fn().mockReturnThis();
        const updateMock = jest.fn();
        const digestMock = jest.fn(() => 'mockedHashedIpAddress');

        // digestメソッドをモックとして設定
        createHashMock.mockReturnValueOnce({ update: updateMock, digest: digestMock });

        // crypto モジュールの createHash をモックとして置き換える
        jest.spyOn(crypto, 'createHash').mockImplementation(createHashMock);

        displayRequestData.hashIpAddress(ipAddress);

        expect(updateMock).toHaveBeenCalledWith(ipAddress);
    });

    it('should call digest with the "hex" format', () => {
      const displayRequestData = new DisplayRequestData();
      const ipAddress = '192.168.1.1';

      // createHashメソッドを直接モック化
      const createHashMock = jest.fn().mockReturnThis();
      const digestMock = jest.fn(() => 'mockedHashedIpAddress');
      createHashMock.mockReturnValueOnce({ update: jest.fn(), digest: digestMock });

      // crypto モジュールの createHash をモックとして置き換える
      jest.spyOn(crypto, 'createHash').mockImplementation(createHashMock);

      const hashedIpAddress = displayRequestData.hashIpAddress(ipAddress);

      expect(digestMock).toHaveBeenCalledWith('hex');
    });

    it('should return the correct hashed IP address', () => {
      const displayRequestData = new DisplayRequestData();
      const ipAddress = '192.168.1.1';

      // createHashメソッドを直接モック化
      const createHashMock = jest.fn().mockReturnThis();
      const digestMock = jest.fn(() => 'mockedHashedIpAddress');
      createHashMock.mockReturnValueOnce({ update: jest.fn(), digest: digestMock });

      // crypto モジュールの createHash をモックとして置き換える
      jest.spyOn(crypto, 'createHash').mockImplementation(createHashMock);

      const hashedIpAddress = displayRequestData.hashIpAddress(ipAddress);

      expect(hashedIpAddress).toBe('mockedHashedIpAddress');
    });

    describe('DisplayRequestData', () => {
      const displayRequestData = new DisplayRequestData();
      const timestamp = displayRequestData.getTimestamp();
      it('年月日時分秒ミリ秒のフォーマットが正しいこと', () => {
        expect(timestamp.ymdhmsmDate).toMatch(/^\d+$/);
      });
      it('年/月/日 のフォーマットが正しいこと', () => {
        expect(timestamp.ymdDate).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
      });
    });
  });