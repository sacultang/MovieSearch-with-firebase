import Typography from '@mui/material/Typography';
import CreditsCard from './components/CreditsCard';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import ScrollGridContainer from '../../components/scrollGrid/ScrollGridContainer';
import TabLayout from '../../components/scrollGrid/TabLayout';

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
          {credits &&
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
