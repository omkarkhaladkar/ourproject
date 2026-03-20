import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, ShieldCheck } from 'lucide-react';
import PropertyGallery from '../../components/property/PropertyGallery';
import PropertyTitleSection from '../../components/property/PropertyTitleSection';
import PropertyStatsBar from '../../components/property/PropertyStatsBar';
import PropertyDescription from '../../components/property/PropertyDescription';
import PropertyAmenities from '../../components/property/PropertyAmenities';
import BlockchainInfo from '../../components/property/BlockchainInfo';
import PropertyMap from '../../components/property/PropertyMap';
import './PropertyDetails.css';

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="property-details-page">
            <div className="container mx-auto px-4 py-6">
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to listings</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Property Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <PropertyGallery />

                        <div className="bg-[#0D1117] rounded-3xl p-6 border border-white/5 shadow-xl">
                            <PropertyTitleSection />
                            <PropertyStatsBar />
                            <PropertyDescription />
                            <PropertyAmenities />
                            <BlockchainInfo />
                            <PropertyMap />
                        </div>
                    </div>

                    {/* Right Column: Sticky Purchase Panel */}
                    <div className="space-y-6">
                        <div className="sticky top-24 bg-[#0D1117] rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-gray-400 text-sm">Full Price</span>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-bold text-white">$450,000</span>
                                        <span className="text-gray-500">.00</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#4F8EF7] hover:border-[#4F8EF7]/50 transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-rose-500 hover:border-rose-500/50 transition-all">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full py-4 rounded-2xl bg-[#4F8EF7] hover:bg-[#3D72C2] text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)] hover:shadow-[0_0_30px_rgba(79,142,247,0.4)] transform hover:-translate-y-0.5 active:translate-y-0">
                                    Buy Full Property
                                </button>
                                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all">
                                    Invest in Fractions
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-emerald-400 mb-4 font-medium">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span>Verified Asset on Blockchain</span>
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Every property on Purandar is fully vetted, legally protected, and tokenized on the Ethereum blockchain for transparency and security.
                                </p>
                            </div>
                        </div>

                        {/* Additional Info Cards on Right */}
                        <div className="bg-gradient-to-br from-[#4F8EF7]/10 to-[#7B5EF8]/10 rounded-3xl p-6 border border-[#4F8EF7]/20">
                            <h3 className="text-white font-semibold mb-2">Want to learn more?</h3>
                            <p className="text-gray-400 text-sm mb-4">Chat with our real estate experts about this property.</p>
                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
