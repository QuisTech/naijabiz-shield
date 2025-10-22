'use client';

import { AssessmentResult, SecurityRecommendation } from '@/types/assessment';
import { Download, Shield, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onDownloadReport: (assessmentId: number) => void;
  onRestart: () => void;
  downloadLoading: boolean;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  result,
  onDownloadReport,
  onRestart,
  downloadLoading
}) => {
  const { risk_assessment, recommendations, threat_alerts, assessment_id } = result;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      case 'critical': return 'risk-critical';
      default: return 'risk-medium';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Risk Summary */}
<div className="card text-center">
  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#dd020f] via-[#76127f] to-[#0c22f1]">
    <Shield className="h-10 w-10 text-white" />
  </div>
  
  <h2 className="text-3xl font-bold text-white mb-4">
    Security Assessment Complete
  </h2>

  {risk_assessment && (
    <>
      <div className="inline-block">
        <span className={`risk-badge ${getRiskColor(risk_assessment.risk_level)} text-lg px-6 py-2`}>
          {risk_assessment.risk_level.toUpperCase()} RISK
        </span>
      </div>

      <p className="text-gray-300 mt-4">
        Your business security score: <strong>{risk_assessment.risk_score.toFixed(1)}%</strong>
      </p>
      <p className="text-sm text-gray-500">
        {risk_assessment.total_questions_answered} questions analyzed
      </p>
    </>
  )}
</div>


      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recommendations */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Shield className="h-6 w-6 text-[#d74622] mr-2" />
            Security Recommendations
          </h3>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  {getPriorityIcon(rec.priority)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{rec.title}</h4>
                      <span className={`risk-badge ${getRiskColor(rec.priority)} text-xs`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{rec.description}</p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500 capitalize">
                        {rec.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Alerts & Actions */}
        <div className="space-y-6">
          {/* Threat Alerts */}
          {threat_alerts.length > 0 && (
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                Current Threat Alerts
              </h3>
              
              <div className="space-y-3">
                {threat_alerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800 text-sm">{alert.title}</h4>
                    <p className="text-orange-700 text-xs mt-1">{alert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">
              Next Steps
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => onDownloadReport(assessment_id)}
                disabled={downloadLoading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {downloadLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF Report
                  </>
                )}
              </button>
              
              <button
                onClick={onRestart}
                className="w-full btn-outline-dark"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Start New Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};