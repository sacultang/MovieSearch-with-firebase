import Typography from '@mui/material/Typography';
import CreditsCard from './components/CreditsCard';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import ScrollGridContainer from '../home/components/ScrollGridContainer';
import TabLayout from '../home/common/TabLayout';

import { CreditType } from '../../types/creditType';

interface CreditsPageProps {
  credits: CreditType[];
}

const CreditsPage = ({ credits }: CreditsPageProps) => {
  return (
    <TabLayout>
      <Typography variant="h5" fontWeight={500}>
        출연진
      </Typography>
      <ScrollWrapBox>
        <ScrollGridContainer>
          {credits.length &&
            credits
              ?.slice(0, 20)
              .map((creditItem) => (
                <CreditsCard key={creditItem.name} creditItem={creditItem} />
              ))}
        </ScrollGridContainer>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default CreditsPage;
