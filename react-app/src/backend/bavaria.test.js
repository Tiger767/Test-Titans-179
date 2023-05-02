import { getParticipants, addBatchDrug, getAllDrugs, removeAllDrugs } from './bavaria';
import { createVendiaClient } from '@vendia/client';

jest.mock('@vendia/client');

describe('Bavaria', () => {
  beforeEach(() => {
    createVendiaClient.mockClear();
  });

  test('getParticipants', async () => {
    const mockList = jest.fn().mockResolvedValue({ items: ['participant1', 'participant2'] });
    createVendiaClient.mockReturnValue({ entities: { patient: { list: mockList } } });

    const participants = await getParticipants();
    expect(participants).toEqual(['participant1', 'participant2']);
    expect(mockList).toHaveBeenCalledTimes(1);
  });

  test('getAllDrugs', async () => {
    const mockList = jest.fn().mockResolvedValue({ items: ['drug1', 'drug2'] });
    createVendiaClient.mockReturnValue({ entities: { drug: { list: mockList } } });

    const allDrugs = await getAllDrugs();
    expect(allDrugs).toEqual(['drug1', 'drug2']);
    expect(mockList).toHaveBeenCalledTimes(1);
  });

  test('addBatchDrug', async () => {
    const mockAdd = jest.fn().mockResolvedValue({ success: true });
    createVendiaClient.mockReturnValue({ entities: { drug: { add: mockAdd } } });

    await addBatchDrug(3, true);
    expect(mockAdd).toHaveBeenCalledTimes(3);
  });

  test('removeAllDrugs', async () => {
    const mockList = jest.fn().mockResolvedValue({ items: [{ _id: 'id1' }, { _id: 'id2' }] });
    const mockRemove = jest.fn().mockResolvedValue({ success: true });
    createVendiaClient.mockReturnValue({ entities: { drug: { list: mockList, remove: mockRemove } } });

    await removeAllDrugs();
    expect(mockList).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledTimes(2);
  });
});
