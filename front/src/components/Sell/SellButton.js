import styled from 'styled-components';

import * as Api from 'api/api';
import { useCoinContext } from 'context/CoinContext';
import { useNavigate } from 'react-router-dom';
import ROUTE from 'utils/ROUTE';

function SellButton({ coinData }) {
  const { setSellNumber } = useCoinContext();
  const navigate = useNavigate();

  const coins = [];

  coinData.JPY && coins.push(...coinData.JPY);
  coinData.CNY && coins.push(...coinData.CNY);
  coinData.USD && coins.push(...coinData.USD);

  const handleClick = async () => {
    const data = {
      order: {
        imageUrl: 'url',
        dealStatus: 'SELL',
      },
      coins,
    };
    try {
      const response = await Api.post('sell', data);
      console.log(response.data);
      const result = response.data.split(' ');
      setSellNumber(result[result.length - 1]);
      navigate(ROUTE.SELLEND);
    } catch (err) {
      console.log(err);
      alert('판매가 완료되지 않았습니다.');
      if (
        err.response.data.name === 'TokenExpiredError' ||
        err.response.data === 'jwt expired'
      ) {
        alert('재로그인 부탁드립니다.');
        navigate(ROUTE.LOGIN);
      }
    }
  };

  return <StyledBtn onClick={handleClick}>판매</StyledBtn>;
}

export default SellButton;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;
