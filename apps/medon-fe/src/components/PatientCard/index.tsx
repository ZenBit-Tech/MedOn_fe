import { Input, Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimateHeight, { Height } from 'react-animate-height';
import { toast } from 'react-toastify';

import { LinkGoBack } from 'components/common/LinkGoBack';
import Button from 'components/Button';
import { TextareaAntD } from 'components/common';
import { PatientNotes } from 'components/PatientNotes';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';

import { addPatientNoteSchema } from 'validation/addPatientNoteSchema';

import { toastConfig } from 'utils/toastConfig';
import { options } from 'utils/constants/options/patientCardSelect';

import { Edit, AddNote, Close } from 'assets/svgs/patientCard';
import {
  useCreatePatientNoteMutation,
  useGetPatientByIdQuery,
  useGetPatientNotesQuery,
} from 'redux/api/patientApi';

import { useDebounce } from 'hooks/useDebounce';

import {
  AddNoteForm,
  Buttons,
  Calendar,
  Container,
  StyledSelect,
  Top,
  Wrapper,
  SkeletonContainer,
} from './styles';
import { SubmitAddNote } from './types';

export default function PatientCard() {
  const [height, setHeight] = useState<Height>(0);
  const [order, setOrder] = useState<string>('DESC');
  const [text, setText] = useState<string>('');
  const [pageValue, setPageValue] = useState<number>(1);
  const [pageSizeValue, setPageSizeValue] = useState<number>(5);
  const value = useDebounce(text, 1000);

  const { id } = useParams();
  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );
  const {
    data: notes,
    isLoading: isNotesLoading,
    isFetching,
  } = useGetPatientNotesQuery({
    id,
    order,
    text: value,
    page: pageValue,
    limit: pageSizeValue,
  });

  const [sendData, { isLoading: isNoteSending }] =
    useCreatePatientNoteMutation();

  const { handleSubmit, control, reset } = useForm<SubmitAddNote>({
    resolver: yupResolver(addPatientNoteSchema),
  });

  const { t } = useTranslation();
  const theme = useTheme();

  const handleAddNote: SubmitHandler<SubmitAddNote> = ({ note }) => {
    sendData({ note, patientId: id })
      .unwrap()
      .then(() => {
        toast.success(t('patient-card.toast.success'), toastConfig);
        reset();
      })
      .catch((err) => {
        toast.error(err.data.message, toastConfig);
      });
  };

  if (isPatientLoading && isNotesLoading)
    return (
      <SkeletonContainer>
        <Skeleton active avatar round />
        <Skeleton active title />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </SkeletonContainer>
    );

  return (
    <Container>
      <Top>
        <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
        <Link to="#">
          {t('patient-card.edit')}
          <Edit />
        </Link>
      </Top>
      <PatientCardInfo {...patient?.data} />
      <h4>{t('patient-card.overview')}</h4>
      <ShowMore text={patient?.data?.overview} />
      {/* TODO: add calendar here */}
      <Calendar>Calendar</Calendar>
      {/* TODO: add calendar here */}
      <Button
        isfullwidth="true"
        textcolor={theme.colors.blue_500}
        bgcolor={theme.colors.blue_100}
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        {t('patient-card.button')}
      </Button>
      <AnimateHeight height={height}>
        <AddNoteForm onSubmit={handleSubmit(handleAddNote)}>
          <TextareaAntD
            name="note"
            control={control}
            minRows={6}
            placeholder={`${t('patient-card.notes.placeholder')}`}
          />
          <Buttons>
            <Button
              textcolor={theme.colors.white}
              bgcolor={theme.colors.btnGradient}
              isLoading={isNoteSending}
            >
              {t('patient-card.notes.add-button')}
              <AddNote />
            </Button>
            <Button
              type="button"
              textcolor={theme.colors.gray_700}
              bgcolor={theme.colors.gray_400}
              onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            >
              <Close />
              {t('patient-card.notes.cancel-button')}
            </Button>
          </Buttons>
        </AddNoteForm>
      </AnimateHeight>
      <h5>{t('patient-card.medical')}</h5>
      <Wrapper>
        <Input.Search
          size="large"
          placeholder={`${t('patient-card.search-input-placeholder')}`}
          onChange={(e) => {
            setText(e.target.value);
          }}
          loading={isFetching}
        />
        <StyledSelect
          defaultValue="DESC"
          options={options}
          size="large"
          onChange={(changeText) => {
            setOrder(changeText as string);
          }}
        />
      </Wrapper>
      <PatientNotes
        isFetching={isFetching}
        notes={notes?.data?.notes}
        total={notes?.data?.total}
        pageSizeValue={pageSizeValue}
        pageValue={pageValue}
        setPageSizeValue={setPageSizeValue}
        setPageValue={setPageValue}
      />
    </Container>
  );
}
