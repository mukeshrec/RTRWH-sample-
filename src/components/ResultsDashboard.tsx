import { CalculationResults } from '../lib/calculations';
import { CostBreakdown, EconomicAnalysis } from '../lib/costEstimation';
import { generatePDFReport } from '../lib/pdfExport';
import {
  Droplets,
  Home,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Gauge,
  Download,
} from 'lucide-react';

interface ResultsDashboardProps {
  results: CalculationResults;
  costBreakdown: CostBreakdown;
  economicAnalysis: EconomicAnalysis;
  projectInput: {
    userName: string;
    locationName: string;
    roofArea: number;
    roofType: string;
    householdSize: number;
  };
}

export default function ResultsDashboard({
  results,
  costBreakdown,
  economicAnalysis,
  projectInput,
}: ResultsDashboardProps) {
  const handleDownloadPDF = () => {
    generatePDFReport(results, costBreakdown, economicAnalysis, projectInput);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              RTRWH Assessment Results
            </h1>
            <p className="text-gray-600">
              {projectInput.userName} • {projectInput.locationName}
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
        </div>
      </div>

      <div
        className={`rounded-lg shadow-lg p-6 ${
          results.isFeasible ? 'bg-green-50 border-2 border-green-500' : 'bg-yellow-50 border-2 border-yellow-500'
        }`}
      >
        <div className="flex items-center mb-4">
          {results.isFeasible ? (
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            {results.isFeasible ? 'Project is FEASIBLE' : 'Partially Feasible'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Water Available</p>
            <p className="text-2xl font-bold text-blue-600">
              {results.waterAvailable.toLocaleString()} L
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Water Required</p>
            <p className="text-2xl font-bold text-gray-800">
              {results.waterRequired.toLocaleString()} L
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Coverage</p>
            <p className="text-2xl font-bold text-green-600">
              {((results.waterAvailable / results.waterRequired) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Droplets className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Storage Tank Design</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tank Capacity</span>
              <span className="font-semibold">{results.tankCapacity.toLocaleString()} L</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tank Diameter</span>
              <span className="font-semibold">{results.tankDiameter.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tank Height</span>
              <span className="font-semibold">{results.tankHeight.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tank Type</span>
              <span className="font-semibold">
                {results.tankCapacity <= 15000
                  ? 'Ferro-cement'
                  : results.tankCapacity <= 50000
                  ? 'Masonry'
                  : 'RCC'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Gauge className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Collection System</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Peak Flow</span>
              <span className="font-semibold">{results.peakFlow.toFixed(2)} lps</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Gutter Diameter</span>
              <span className="font-semibold">{results.gutterDiameter} mm</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Downpipe Diameter</span>
              <span className="font-semibold">{results.downpipeDiameter} mm</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">First Flush Volume</span>
              <span className="font-semibold">{results.firstFlushVolume.toFixed(1)} L</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Filter Specifications</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Filter Type</span>
              <span className="font-semibold">{results.filterType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Filter Area</span>
              <span className="font-semibold">{results.filterArea.toFixed(2)} m²</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Filter Dimensions</span>
              <span className="font-semibold">
                {results.filterLength.toFixed(1)} m × {results.filterWidth.toFixed(1)} m
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Filtration Rate</span>
              <span className="font-semibold">
                {results.filterType === 'Slow Sand' ? '100-200' : '3000-6000'} L/hr/m²
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Recharge Structure</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Structure Type</span>
              <span className="font-semibold">{results.rechargeStructureType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Depth</span>
              <span className="font-semibold">
                {results.rechargeStructureDepth.toFixed(1)} m
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Diameter</span>
              <span className="font-semibold">
                {results.rechargeStructureDiameter.toFixed(2)} m
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">Cost Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Investment</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{costBreakdown.totalCost.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Annual Benefits</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{economicAnalysis.totalAnnualBenefits.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">B/C Ratio</p>
            <p className="text-2xl font-bold text-purple-600">
              {economicAnalysis.bcRatio.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Cost Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Storage Tank</span>
                <span className="font-semibold">₹{costBreakdown.tankCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Piping System</span>
                <span className="font-semibold">
                  ₹{costBreakdown.pipingCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Filter Unit</span>
                <span className="font-semibold">
                  ₹{costBreakdown.filterCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Recharge Structure</span>
                <span className="font-semibold">
                  ₹{costBreakdown.rechargeStructureCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Civil Works</span>
                <span className="font-semibold">
                  ₹{costBreakdown.civilWorksCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Labor</span>
                <span className="font-semibold">
                  ₹{costBreakdown.laborCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Financial Viability</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Payback Period</span>
                <span className="font-semibold">
                  {economicAnalysis.paybackPeriod.toFixed(1)} years
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Annual Water Savings</span>
                <span className="font-semibold">
                  ₹{economicAnalysis.annualWaterSavings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Annual Maintenance</span>
                <span className="font-semibold">
                  ₹{economicAnalysis.annualMaintenanceCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">With 50% Subsidy</span>
                <span className="font-semibold">
                  Payback: {economicAnalysis.paybackPeriodWithSubsidy.toFixed(1)} years
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">NPV (20 years)</span>
                <span
                  className={`font-semibold ${
                    economicAnalysis.netPresentValue > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ₹{economicAnalysis.netPresentValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg ${
            economicAnalysis.bcRatio >= 1.5
              ? 'bg-green-100 border border-green-300'
              : economicAnalysis.bcRatio >= 1.0
              ? 'bg-blue-100 border border-blue-300'
              : 'bg-yellow-100 border border-yellow-300'
          }`}
        >
          <p className="font-semibold text-gray-800">
            {economicAnalysis.bcRatio >= 1.5
              ? '✓ Highly Viable Investment'
              : economicAnalysis.bcRatio >= 1.0
              ? '✓ Viable Investment'
              : '⚠ Consider with Subsidy Support'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {economicAnalysis.bcRatio >= 1.5
              ? 'Excellent economic returns. Strongly recommended for implementation.'
              : economicAnalysis.bcRatio >= 1.0
              ? 'Good economic returns. Recommended for implementation.'
              : 'Acceptable with government subsidy. Focus on environmental and social benefits.'}
          </p>
        </div>
      </div>

      {results.warnings.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Warnings & Considerations</h3>
          </div>
          <ul className="space-y-2">
            {results.warnings.map((warning, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.recommendations.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {results.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-semibold mb-2">1. Review Design</p>
            <p className="text-sm">Download detailed technical report with drawings and BOQ</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-semibold mb-2">2. Seek Approvals</p>
            <p className="text-sm">
              Apply for necessary permissions and explore subsidy schemes
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="font-semibold mb-2">3. Implementation</p>
            <p className="text-sm">Hire qualified contractors and begin construction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
