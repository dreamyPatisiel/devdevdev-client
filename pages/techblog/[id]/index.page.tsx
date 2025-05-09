import React from 'react';

import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore, useModalStore } from '@stores/modalStore';
import { useSelectedCommentIdStore } from '@stores/techBlogStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import CommentUserInfo from '@components/common/comment/CommentUserInfo';
import WritableComment from '@components/common/comment/WritableComment';
import CommentModals from '@components/common/commentModal/CommentModals';
import DevGuriError from '@components/common/error/DevGuriError';
import DevGuriHorizontalError from '@components/common/error/DevGuriHorizontalError';
import MobileToListButton from '@components/common/mobile/mobileToListButton';
import { LoginModal } from '@components/common/modals/modal';

import { usePostBlames } from '@/api/usePostBlames';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeleteTechComment } from '../api/useDeleteComment';
import { useGetDetailTechBlog } from '../api/useGetTechBlogDetail';
import { usePostMainComment } from '../api/usePostComment';
import CommentTechSection from '../components/CommentTechSection';
import CompanyInfoCard from '../components/CompanyInfoCard';
import TechDetailCard from '../components/TechDetailCard';
import { TechCardProps } from '../types/techBlogType';

export default function Page() {
  const router = useRouter();
  const techArticleId = router.query.id as string | undefined;

  // 댓글 삭제&수정 mutation
  const { mutate: deleteCommentMutation } = useDeleteTechComment();
  // 모달
  const { selectedCommentId } = useSelectedCommentIdStore();
  const { isModalOpen, modalType, contents } = useModalStore();
  const { isLoginModalOpen } = useLoginModalStore();

  // 신고
  const { selectedBlameData } = useSelectedStore();
  const { blameReason } = useBlameReasonStore();

  // 로그인여부
  const { loginStatus } = useLoginStatusStore();

  const { isMobile } = useMediaQueryContext();

  const { data, status } = useGetDetailTechBlog(techArticleId);
  const { mutate: commentMutation } = usePostMainComment();
  const { mutate: postBlames } = usePostBlames();

  /** 댓글 작성 함수 */
  const handleMainCommentSubmit = ({
    contents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    commentMutation(
      {
        techArticleId: Number(techArticleId),
        contents: contents,
      },
      {
        onSuccess: onSuccess,
      },
    );
  };

  const getStatusComponent = (
    CurDetailTechBlogData: TechCardProps | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!techArticleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        return <DevLoadingComponent />;

      case 'success':
        if (!CurDetailTechBlogData) return;
        const { company } = CurDetailTechBlogData;

        return (
          <article className={isMobile ? 'px-[1.6rem] pb-[6.4rem]' : 'px-[20.4rem] py-[6.4rem]'}>
            <TechDetailCard techDetailProps={CurDetailTechBlogData} techArticleId={techArticleId} />

            {/* 기업상세 카드 */}
            <CompanyInfoCard companyId={company.id} showArticleViewButton />
            {/* 댓글 */}
            <CommentUserInfo className={`${isMobile ? 'mt-[8.8rem]' : 'mt-[7.2rem]'}`} />

            {/* 댓글작성 */}
            <div className='mt-[1.6rem] mb-[10rem]'>
              <WritableComment
                type='techblog'
                mode='register'
                writableCommentButtonClick={handleMainCommentSubmit}
              />
            </div>

            {/* 댓글들 */}

            <QueryErrorBoundary
              fallbackRender={({ handleRetryClick }) => (
                <DevGuriHorizontalError handleRetryClick={handleRetryClick} />
              )}
            >
              <CommentTechSection articleId={techArticleId} />
            </QueryErrorBoundary>

            {/* 목록으로 버튼 */}
            {isMobile && <MobileToListButton route={ROUTES.TECH_BLOG} />}
          </article>
        );
      default:
        return <></>;
    }
  };

  // 댓글 신고 기능 함수들
  const isSubmitButtonDisable = selectedBlameData?.reason === '기타' && blameReason.length < 10;

  const modalSubmitFn = () => {
    if (modalType === '신고하기' && selectedCommentId && selectedBlameData) {
      postBlames({
        blamePathType: 'TECH_ARTICLE',
        params: {
          blameTypeId: selectedBlameData?.id,
          customReason: blameReason === '' ? null : blameReason,
          techArticleCommentId: selectedCommentId,
          techArticleId: Number(techArticleId),
        },
      });
    }
    if (modalType === '삭제하기' && selectedCommentId) {
      deleteCommentMutation({
        techArticleId: Number(techArticleId),
        techCommentId: selectedCommentId,
      });
    }
  };

  return (
    <>
      {getStatusComponent(data, status)}
      {isModalOpen && (
        <CommentModals
          modalType={modalType}
          contents={contents}
          modalSubmitFn={modalSubmitFn}
          submitButtonDisable={isSubmitButtonDisable}
        />
      )}
      {isLoginModalOpen && loginStatus !== 'login' && <LoginModal />}
    </>
  );
}
