import {
getEligiblePatients,
setPatientReceive,
assignDoses,
labelDoses,
getAllDrugs,
shareDoseAssignments,
} from './fda';
import { createVendiaClient } from '@vendia/client';


// TODO: FINISH AND ADAPT TEST

jest.mock('@vendia/client');

describe('FDA', () => {
    beforeEach(() => {
        createVendiaClient.mockClear();
    });

    test('getEligiblePatients', async () => {
        const mockList = jest
        .fn()
        .mockResolvedValue({ items: ['patient1', 'patient2'] });
        createVendiaClient.mockReturnValue({
        entities: { patient: { list: mockList } },
        });

        const eligiblePatients = await getEligiblePatients();
        expect(eligiblePatients).toEqual(['patient1', 'patient2']);
        expect(mockList).toHaveBeenCalledTimes(1);
    });

    test('setPatientReceive', async () => {
        const mockGetPatient = jest.fn().mockResolvedValue({ _id: 'patient1' });
        const mockUpdate = jest.fn().mockResolvedValue({ success: true });
        createVendiaClient.mockReturnValue({
        entities: { patient: { update: mockUpdate } },
        });

        await setPatientReceive(true, 0);
        expect(mockUpdate).toHaveBeenCalledTimes(1);
    });

    test('getAllDrugs', async () => {
        const mockList = jest.fn().mockResolvedValue({ items: ['drug1', 'drug2'] });
        createVendiaClient.mockReturnValue({ entities: { drug: { list: mockList } } });

        const allDrugs = await getAllDrugs();
        expect(allDrugs).toEqual(['drug1', 'drug2']);
        expect(mockList).toHaveBeenCalledTimes(1);
    });

    test('assignDoses', async () => {
        const mockPatientList = jest.fn().mockResolvedValue({
          items: [{ uuid: 'patient1' }, { uuid: 'patient2' }],
        });
        const mockDrugList = jest.fn().mockResolvedValue({
          items: [{ _id: 'dose1' }, { _id: 'dose2' }],
        });
        const mockUpdate = jest.fn().mockResolvedValue({ success: true });
        createVendiaClient.mockReturnValue({
          entities: {
            patient: { list: mockPatientList },
            drug: { list: mockDrugList, update: mockUpdate },
          },
        });
      
        await assignDoses(true);
        expect(mockUpdate).toHaveBeenCalledTimes(2);
      });
      
      test('labelDoses', async () => {
        const mockDrugList = jest.fn().mockResolvedValue({
          items: [{ _id: 'dose1' }, { _id: 'dose2' }],
        });
        const mockUpdate = jest.fn().mockResolvedValue({ success: true });
        createVendiaClient.mockReturnValue({
          entities: { drug: { list: mockDrugList, update: mockUpdate } },
        });
      
        await labelDoses();
        expect(mockUpdate).toHaveBeenCalledTimes(2);
      });
      
      test('shareDoseAssignments', async () => {
        const mockPatientList = jest.fn().mockResolvedValue({
          items: [{ _id: 'patient1', placeboReciever: true }],
        });
        const mockDrugList = jest.fn().mockResolvedValue({
          items: [{ _id: 'dose1', fid: 'fid1', patientUuid: 'patient1' }],
        });
        const mockUpdate = jest.fn().mockResolvedValue({ success: true });
        createVendiaClient.mockReturnValue({
          entities: {
            patient: { list: mockPatientList, update: mockUpdate },
            drug: { list: mockDrugList, update: mockUpdate },
          },
        });
      
        await shareDoseAssignments();
        expect(mockUpdate).toHaveBeenCalledTimes(2);
      });
});
