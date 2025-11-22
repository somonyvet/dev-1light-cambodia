import {NextRequest, NextResponse} from "next/server";
import {adminDb} from "@lib/firebaseAdmin";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        const blogId = (await params).id;

        if (!blogId)
            return new NextResponse(JSON.stringify({
                error: {
                    code: 400,
                    message: "Blog ID is required"
                }
            }), {
                status: 400,
                headers: {"Content-Type": "application/json"}
            });

        const ref = adminDb.collection("blogs").doc(blogId);
        const snapshot = await ref.get();

        if (!snapshot.exists)
            return new NextResponse(JSON.stringify({
                error: {
                    code: 404,
                    message: "Blog not found"
                }
            }), {
                status: 404,
                headers: {"Content-Type": "application/json"}
            })

        const blogCredential = {id: snapshot.id, ...snapshot.data()};

        return new NextResponse(JSON.stringify({
            data: {
                status: 200,
                message: "Blog fetched successfully",
                blog: blogCredential
            }
        }), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })
    } catch (err: any) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: "Internal server error"
        }
        return new NextResponse(JSON.stringify(error), {status: 500});
    }
}