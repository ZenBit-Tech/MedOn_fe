import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import PatientCardNotes from 'components/PatientCardNotes';
import { PatientNote } from 'interfaces/patients';

import { formatDate, formatTime } from 'utils/functions';
import { defaultLimit, defaultPage } from 'utils/constants';

import { IPatientNotesProps } from './types';
import { BtnContainer, StyledButton } from './styles';

export function PatientNotes({
  notes = [],
  isFetching,
  total = 0,
  page = defaultPage,
  setPage,
}: IPatientNotesProps) {
  const { t } = useTranslation();

  if (isFetching && !notes.length) {
    return <Skeleton active />;
  }

  if (!notes?.length) {
    return <span>{t('patient-card.notes.empty-notes')}</span>;
  }

  return (
    <>
      {notes.map((note: PatientNote) => (
        <PatientCardNotes
          key={note.id}
          note={note.note}
          date={formatDate(note.createdAt)}
          time={formatTime(note.createdAt)}
          doctor={note.doctor}
        />
      ))}
      {total > page * defaultLimit && (
        <BtnContainer>
          <StyledButton
            type="primary"
            size="large"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            {t('patient-list.load-more')}
          </StyledButton>
        </BtnContainer>
      )}
    </>
  );
}
