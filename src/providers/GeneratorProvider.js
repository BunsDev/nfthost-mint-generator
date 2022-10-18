import { useState, useContext, createContext, useRef } from "react";
import { metadataStandardsArr } from "@/utils/json";

export const GeneratorContext = createContext({});
export const useGenerator = () => useContext(GeneratorContext);

export const GeneratorProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storageURL, setStorageURL] = useState("");
  const [externalURL, setExternalURL] = useState("");
  const [standardType, setStandardType] = useState(metadataStandardsArr[0]);
  const [collectionSize, setCollectionSize] = useState(100);
  const [symbol, setSymbol] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [sellerFee, setSellerFee] = useState(1000);
  const [creatorShare, setCreatorShare] = useState(100);
  const [creators, setCreators] = useState([]);
  const [layers, setLayers] = useState([{ name: "Background", images: [] }]);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [imageDimension, setImageDimension] = useState();
  const [isConfetti, setIsConfetti] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [autoSavePercentage, setAutoSavePercentage] = useState(0);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [metadata, setMetadata] = useState();
  const [curMetadata, setCurMetadata] = useState("");
  const [renderIndex, setRenderIndex] = useState(1);
  const [generateSpeed, setGenerateSpeed] = useState(0);
  const [isRarityModal, setIsRarityModal] = useState(false);
  const [isGenerateModal, setIsGenerateModal] = useState(false);
  const [isDownloadModal, setIsDownloadModal] = useState(false);
  const [isRandomizedMetadata, setIsRandomizedMetadata] = useState(false);
  const [previewLayers, setPreviewLayers] = useState();
  const [backgroundColor, setBackgroundColor] = useState("");
  const [animationURL, setAnimationURL] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [utilsTab, setUtilsTab] = useState("image");
  const [jsonFiles, setJsonFiles] = useState();
  const canvasRef = useRef();

  const controllers = {
    name,
    setName,
    description,
    setDescription,
    externalURL,
    setExternalURL,
    standardType,
    setStandardType,
    collectionSize,
    setCollectionSize,
    symbol,
    setSymbol,
    creatorAddress,
    setCreatorAddress,
    sellerFee,
    setSellerFee,
    creatorShare,
    setCreatorShare,
    creators,
    setCreators,
    layers,
    setLayers,
    currentLayer,
    setCurrentLayer,
    imageDimension,
    setImageDimension,
    isRarityModal,
    setIsRarityModal,
    isGenerateModal,
    setIsGenerateModal,
    isAutoSave,
    setIsAutoSave,
    isGenerating,
    setIsGenerating,
    isGenerated,
    setIsGenerated,
    isDownloading,
    setIsDownloading,
    autoSavePercentage,
    setAutoSavePercentage,
    downloadPercentage,
    setDownloadPercentage,
    metadata,
    setMetadata,
    curMetadata,
    setCurMetadata,
    renderIndex,
    setRenderIndex,
    generateSpeed,
    setGenerateSpeed,
    canvasRef,
    isConfetti,
    setIsConfetti,
    isDownloadModal,
    setIsDownloadModal,
    previewLayers,
    setPreviewLayers,
    isRandomizedMetadata,
    setIsRandomizedMetadata,
    storageURL,
    setStorageURL,
    animationURL,
    setAnimationURL,
    youtubeURL,
    setYoutubeURL,
    backgroundColor,
    setBackgroundColor,
    utilsTab,
    setUtilsTab,
    jsonFiles,
    setJsonFiles,
  };

  return (
    <GeneratorContext.Provider value={controllers}>
      {children}
    </GeneratorContext.Provider>
  );
};
