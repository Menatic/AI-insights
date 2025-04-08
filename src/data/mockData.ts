
// Mock data for AI model metrics
export const modelData = [
  {
    id: "model-1",
    name: "ResNet-50 Classifier",
    description: "Image classification model with fine-tuning on custom dataset",
    accuracy: 93.7,
    status: "complete" as const,
    type: "classification" as const,
    lastUpdated: "2 hours ago"
  },
  {
    id: "model-2",
    name: "BERT-NLP Sentiment",
    description: "NLP model for sentiment analysis on customer reviews",
    accuracy: 89.2,
    status: "training" as const,
    type: "nlp" as const,
    lastUpdated: "5 mins ago"
  },
  {
    id: "model-3",
    name: "TimeSeries-LSTM",
    description: "Time series forecasting for energy consumption prediction",
    accuracy: 78.5,
    status: "complete" as const,
    type: "regression" as const,
    lastUpdated: "1 day ago"
  },
  {
    id: "model-4",
    name: "PetFinder-XGBoost",
    description: "Animal adoption prediction model using gradient boosting",
    accuracy: 65.2,
    status: "error" as const,
    type: "classification" as const,
    lastUpdated: "3 days ago"
  }
];

// Mock data for accuracy over time chart
export const accuracyData = [
  { name: "Day 1", training: 45, validation: 35 },
  { name: "Day 2", training: 52, validation: 48 },
  { name: "Day 3", training: 61, validation: 53 },
  { name: "Day 4", training: 67, validation: 58 },
  { name: "Day 5", training: 72, validation: 63 },
  { name: "Day 6", training: 78, validation: 67 },
  { name: "Day 7", training: 81, validation: 73 },
  { name: "Day 8", training: 87, validation: 76 },
  { name: "Day 9", training: 91, validation: 80 },
  { name: "Day 10", training: 94, validation: 85 }
];

// Mock data for metrics
export const metricsData = {
  activeModels: 14,
  activeModelsChange: {
    value: 23,
    trend: "up" as const
  },
  totalTrainingHours: 682,
  totalTrainingHoursChange: {
    value: 12,
    trend: "up" as const
  },
  gpuUtilization: 78,
  gpuUtilizationChange: {
    value: 5,
    trend: "down" as const
  },
  successRate: 92,
  successRateChange: {
    value: 3,
    trend: "up" as const
  }
};

// Mock data for recent training runs
export const recentRuns = [
  {
    id: "run-1",
    model: "ResNet-50 Classifier",
    startTime: "2023-04-05T08:30:00",
    duration: "1h 23m",
    status: "completed",
    accuracy: 93.7,
    loss: 0.21
  },
  {
    id: "run-2",
    model: "BERT-NLP Sentiment",
    startTime: "2023-04-05T10:15:00",
    duration: "ongoing",
    status: "running",
    accuracy: 89.2,
    loss: 0.34
  },
  {
    id: "run-3",
    model: "TimeSeries-LSTM",
    startTime: "2023-04-04T22:10:00",
    duration: "5h 47m",
    status: "completed",
    accuracy: 78.5,
    loss: 0.47
  },
  {
    id: "run-4",
    model: "PetFinder-XGBoost",
    startTime: "2023-04-02T15:20:00",
    duration: "2h 15m",
    status: "failed",
    accuracy: 0,
    loss: 2.34
  }
];

// Mock data for GPU memory usage chart
export const gpuMemoryData = [
  { name: "00:00", usage: 8.2 },
  { name: "02:00", usage: 7.8 },
  { name: "04:00", usage: 6.5 },
  { name: "06:00", usage: 7.1 },
  { name: "08:00", usage: 10.3 },
  { name: "10:00", usage: 14.8 },
  { name: "12:00", usage: 15.2 },
  { name: "14:00", usage: 16.7 },
  { name: "16:00", usage: 19.3 },
  { name: "18:00", usage: 18.2 },
  { name: "20:00", usage: 16.5 },
  { name: "22:00", usage: 12.4 },
  { name: "now", usage: 14.2 }
];
