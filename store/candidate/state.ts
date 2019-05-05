import CandidateModal from "~/modals/candidate_modal";

export interface CandidateState {
  candidateModal: CandidateModal;
  candidateModalList: CandidateModal[];
  candidateID: string;
}

const state = (): CandidateState => ({
  candidateModal: new CandidateModal(),
  candidateModalList: [],
  candidateID: ""
});

export default state;
