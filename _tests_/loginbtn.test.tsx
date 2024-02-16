import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Header from '@components/header';
// import Modal from '@/components/modals/modal';
import Layout from '@components/layout';

describe('헤더의 로그인 버튼을 클릭할때', () => {
  test('카카오 로그인 버튼 모달이 떠야한다.', () => {
    //     const { getByText, queryByText } = render(<Header />);
    //     const { queryByTestId } = render(<Modal />);
    //     fireEvent.click(getByText('로그인'));
    //     expect(queryByTestId('login-modal')).toBeInTheDocument();
    //   });
  });
  // describe('모달창이 떠있을때 모달 바깥 영역을 클릭하면', () => {
  //   test('카카오 로그인 버튼 모달이 닫혀야한다.', async () => {
  //     const { queryByTestId } = render(
  //       <Layout>
  //         <></>
  //       </Layout>,
  //     );
  //     fireEvent.click(queryByTestId('modal-background') as Element);
  //     await waitFor(() => {
  //       expect(queryByTestId('login-modal')).not.toBeInTheDocument();
  //     });
  //   });
});
