import { contentFiles, getContentFileTree } from "@/util/util";
import Link from "next/link";
import { LuExternalLink, LuFolder, LuClock, LuTag } from "react-icons/lu";
import MagicFileTree from "@/components/MagicFileTree";

const page = () => {
    const content = contentFiles();
    const fileTree = getContentFileTree();
    
    // Group content by category
    const contentByCategory: Record<string, typeof content> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content.forEach((post: any) => {
        if (!contentByCategory[post.category]) {
            contentByCategory[post.category] = [];
        }
        contentByCategory[post.category].push(post);
    });

    const totalPosts = content.length;
    const categories = Object.keys(contentByCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Blog Collection
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Explore our comprehensive collection of articles, tutorials, and guides
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <LuFolder className="text-blue-500" />
                            <span>{categories.length} Categories</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <LuExternalLink className="text-green-500" />
                            <span>{totalPosts} Articles</span>
                        </div>
                    </div>
                </div>

                {/* File Tree Section */}
                <div className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <LuFolder className="text-blue-500" />
                            Content Structure
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Interactive file tree showing the organization of our content. Click on any file to navigate directly to it.
                        </p>
                        <MagicFileTree data={fileTree} />
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">All Articles</h2>
                        <p className="text-gray-600">Browse through our collection organized by category</p>
                    </div>

                    {Object.entries(contentByCategory).map(([category, posts]) => (
                        <div key={category} className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    <LuTag className="size-4" />
                                    {category}
                                </div>
                                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"></div>
                                <span className="text-sm text-gray-500">{posts.length} article{posts.length !== 1 ? 's' : ''}</span>
                            </div>
                            
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {posts.map((post: any) => (
                                    <Link
                                        key={post.slug}
                                        href={post.url}
                                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <LuExternalLink className="size-4 text-gray-400 group-hover:text-blue-500 transition-colors mt-1 flex-shrink-0" />
                                            </div>
                                            
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {post.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span className="bg-gray-100 px-2 py-1 rounded-full">
                                                    {post.category}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <LuClock className="size-3" />
                                                    <span>2 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">{totalPosts}</div>
                            <div className="text-blue-100">Total Articles</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">{categories.length}</div>
                            <div className="text-blue-100">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">∞</div>
                            <div className="text-blue-100">Learning Opportunities</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
