// 검증 요청 모달
import { X, Upload, FileText, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface VerificationRequestModalProps {
  onClose?: () => void;
  onVerificationData: (data: VerificationData) => void;
}

export interface VerificationData {
  receiptImage?: string;
}

export function VerificationRequestModal({ onClose, onVerificationData }: VerificationRequestModalProps) {
  const [step, setStep] = useState<'upload' | 'success'>('upload');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (step === 'upload') {
      setStep('success');
      setTimeout(() => {
        onVerificationData({ receiptImage: uploadedFile || undefined });
        onClose?.();
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 'upload' && '병원 진료 인증'}
            {step === 'success' && '인증 요청 완료'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  실제 병원 진료 후기임을 인증하면 <span className="font-bold">검증 배지</span>가 부여되고 더 많은 사용자에게 노출됩니다.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-2">
                <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">다음 중 하나를 업로드해주세요:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-xs">
                    <li>진료비 영수증</li>
                    <li>진료확인서</li>
                    <li>진단서</li>
                    <li>국민건강보험공단 진료내역</li>
                    <li>의료비 소득공제 내역</li>
                  </ul>
                </div>
              </div>

              {!uploadedFile ? (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload className="w-12 h-12" />
                      <p className="text-sm font-medium">파일을 선택하거나 드래그하세요</p>
                      <p className="text-xs">JPG, PNG (최대 5MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedFile}
                    alt="업로드된 증빙"
                    className="w-full h-64 object-contain bg-gray-50 rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700">
                  개인정보 보호를 위해 주민등록번호, 전화번호 등 민감한 정보는 가려서 업로드해주세요. 업로드된 자료는 인증 후 안전하게 삭제됩니다.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">인증 요청 완료!</h3>
              <p className="text-sm text-gray-600 mb-4">
                검증까지 1~2일 소요될 수 있습니다.
                <br />
                승인되면 마이페이지 &gt; 내 활동에서 인증 상태를 확인할 수 있습니다.
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  📱 <span className="font-medium">마이페이지 &gt; 내 활동</span>에서 인증 상태를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              인증 요청하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}