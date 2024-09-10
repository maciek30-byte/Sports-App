import { UserService } from '../../services/UserService';
import styles from './UserProgress.module.css';
import { Card, Progress } from 'antd';
import { useEffect, useState } from 'react';

interface UserProgressData {
  level: number;
  experience: number;
  nextLevelExperience: number;
}

const UserProgress: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressData | null>(null);

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const fetchUserProgress = async () => {
    try {
      const data = await UserService.getUserProgress();
      setProgress(data);
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
    }
  };

  if (!progress) {
    return <div>Loading...</div>;
  }

  const progressPercentage = (progress.experience / progress.nextLevelExperience) * 100;

  return (
    <Card title="Your Progress" className={styles.progressCard}>
      <h3>Level {progress.level}</h3>
      <Progress
        percent={progressPercentage}
        format={() => `${progress.experience}/${progress.nextLevelExperience} XP`}
      />
    </Card>
  );
};

export default UserProgress;




